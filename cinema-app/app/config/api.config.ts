import * as process from 'process'

export const SERVER_URL = process.env.SERVER_URL
export const API_URL = `${SERVER_URL}/api`

export const getAuthUrl = (string: string) => `/auth/${string}`
export const getUserUrl = (string: string) => `/user/${string}`
export const getMovieUrl = (string: string) => `/movie/${string}`
export const getGenreUrl = (string: string) => `/genre/${string}`
export const getActorUrl = (string: string) => `/actor/${string}`
