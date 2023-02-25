import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type responseType =
  | null
  | { message: string; status: number }
  | { error: string; status: number }

type initialStateType = {
  message: null | { message: string }
  error: null | { error: string; status: number }
}

export const popupSlice = createSlice({
  name: 'popupSlice',
  initialState: {
    error: null,
    message: null,
  } as initialStateType,
  reducers: {
    setMessage(
      state,
      { payload }: PayloadAction<{ message: string } | null>,
    ) {
      state.message = payload
    },
    setError(
      state,
      {
        payload,
      }: PayloadAction<{ error: string; status: number } | null>,
    ) {
      state.error = payload
    },
  },
})

export const { setMessage, setError } = popupSlice.actions
