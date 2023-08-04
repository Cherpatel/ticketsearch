import { genreValues } from "./consts";

export function getGenreTitleByValue(value) {
    return genreValues.find(elem => elem.value === value && value !== null)?.name || null;
}

export function isSkeleton(prop) {
    const skeletonValues = [null, undefined, 0];
    return skeletonValues.includes(prop) ? " skeleton" : "";
}

export function cinemasToSelectForm(cinemas) {
    if (cinemas === null) return [];
    return cinemas.map((cinema) => ({...cinema, value: cinema.id}))
}