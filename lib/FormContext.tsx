"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import {
  FormData,
  FormState,
  FormAction,
  FormErrors,
  BlueprintResponse,
  AppType,
} from "@/types/form";
import {
  loadBlueprintFromStorage,
  saveBlueprintToStorage,
  clearBlueprintStorage,
} from "@/lib/storage";

const initialFormData: FormData = {
  appDescription: "",
  appTypes: [],
  users: undefined,
  teamSize: undefined,
  budget: undefined,
  timeline: undefined,
  preferences: "",
};

const initialState: FormState = {
  data: initialFormData,
  errors: {},
  isSubmitting: false,
  blueprint: undefined,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        data: {
          ...state.data,
          [action.field]: action.value,
        },
        errors: {
          ...state.errors,
          [action.field]: undefined,
        },
      };

    case "ADD_APP_TYPE":
      if (state.data.appTypes.includes(action.appType)) {
        return state;
      }
      return {
        ...state,
        data: {
          ...state.data,
          appTypes: [...state.data.appTypes, action.appType],
        },
        errors: {
          ...state.errors,
          appTypes: undefined,
        },
      };

    case "REMOVE_APP_TYPE":
      return {
        ...state,
        data: {
          ...state.data,
          appTypes: state.data.appTypes.filter((t) => t !== action.appType),
        },
      };

    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };

    case "SET_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };

    case "SET_BLUEPRINT":
      saveBlueprintToStorage(action.blueprint);
      return {
        ...state,
        blueprint: action.blueprint,
        isSubmitting: false,
      };

    case "HYDRATE_BLUEPRINT":
      return {
        ...state,
        blueprint: action.blueprint,
      };

    case "RESET_FORM":
      clearBlueprintStorage();
      return initialState;

    default:
      return state;
  }
}

interface FormContextType {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
  updateField: <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => void;
  toggleAppType: (appType: AppType) => void;
  toggleOptionalField: <K extends keyof FormData>(
    field: K,
    value: NonNullable<FormData[K]>
  ) => void;
  validateForm: () => boolean;
  resetForm: () => void;
  hydrated: boolean;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [hydrated, setHydrated] = React.useState(false);

  useEffect(() => {
    const stored = loadBlueprintFromStorage();
    if (stored) {
      dispatch({ type: "HYDRATE_BLUEPRINT", blueprint: stored });
    }
    setHydrated(true);
  }, []);

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  };

  const toggleAppType = (appType: AppType) => {
    if (state.data.appTypes.includes(appType)) {
      dispatch({ type: "REMOVE_APP_TYPE", appType });
    } else {
      dispatch({ type: "ADD_APP_TYPE", appType });
    }
  };

  const toggleOptionalField = <K extends keyof FormData>(
    field: K,
    value: NonNullable<FormData[K]>
  ) => {
    const current = state.data[field];
    updateField(
      field,
      (current === value ? undefined : value) as FormData[K]
    );
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!state.data.appDescription.trim()) {
      errors.appDescription = "Please describe what your app does";
    }

    if (state.data.appTypes.length === 0) {
      errors.appTypes = "Please select at least one app type";
    }

    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
      return false;
    }

    return true;
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  const value: FormContextType = {
    state,
    dispatch,
    updateField,
    toggleAppType,
    toggleOptionalField,
    validateForm,
    resetForm,
    hydrated,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
}
