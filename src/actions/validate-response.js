import { API_BASE_URL } from '../config'
import { normalizeResponseErrors } from './utils'

export const VALIDATE_RESPONSE_SUCCESS = 'VALIDATE_RESPONSE_SUCCESS'
export const validateResponseSuccess = data => ({
    type: VALIDATE_RESPONSE_SUCCESS,
    data,
})

export const VALIDATE_RESPONSE_ERROR = 'VALIDATE_RESPONSE_ERROR'
export const validateResponseError = error => ({
    type: VALIDATE_RESPONSE_ERROR,
    error,
})

export const validateResponse = question => (dispatch, getState) => {
    const authToken = getState().auth.authToken
    return fetch(`${API_BASE_URL}/data`, {
        method: 'POST',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
        },
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({ data }) => dispatch(validateResponseSuccess(data)))
        .catch(err => {
            dispatch(validateResponseError(err))
        })
}
