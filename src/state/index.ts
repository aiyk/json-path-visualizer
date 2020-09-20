import { IConfig } from 'overmind'
import { createHook } from 'overmind-react'

interface IState {
    data: any,
    selectedValues: any[],
    isLoading: boolean,
    error: boolean
}

// the state
const state: IState = {
    data: null,
    selectedValues: [],
    isLoading: false,
    error: false
}

// perform actions on the state
const actions = {
    // set the uploaded file value
    loadJson : ({ state }: any, uploadedData: any) => {
        state.data = uploadedData;
        state.selectedValues = [];
        state.error = false;
    },

    // reset the state
    reset : ({state}: any) => {
        state.data = null;
        state.selectedValues = [];
        state.isLoading = false;
        state.error = false;
    },

    // set loading state
    setLoading : ({state}:any, loadingState:boolean) => {
        state.isLoading = loadingState;
    },

    // set loading state
    selectedValuesUpdate : ({ state }: any, selectedValues: any[]) => {
        state.selectedValues = selectedValues;
    },

    // error
    error : ({state}:any, errorState:boolean) => {
        state.error = errorState;
    }
}

// configuration object
export const config = { state, actions }

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

// hook to get access in our components
export const useOvermind = createHook<typeof config>()