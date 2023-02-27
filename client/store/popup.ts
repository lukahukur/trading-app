import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialStateType = {
  message: null | { message: string }
  exception: null | { message: string }
}

export const popupSlice = createSlice({
  name: 'popupSlice',
  initialState: {
    exception: null,
    message: null,
  } as initialStateType,
  reducers: {
    setMessage(
      state,
      { payload }: PayloadAction<{ message: string } | null>,
    ) {
      state.message = payload
    },
    setException(
      state,
      { payload }: PayloadAction<{ message: string } | null>,
    ) {
      state.exception = payload
    },
  },
})

export const { setMessage, setException } = popupSlice.actions
