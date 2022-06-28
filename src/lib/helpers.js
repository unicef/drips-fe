import {any, compose, equals, prop, isEmpty, filter, not, replace, toUpper} from 'ramda';
import {useRef, useEffect} from 'react';
export const setValueFromEvent = setter => ({target: {value}}) => setter(value);
export const oneIsEmpty = (...items) =>
  any(
    compose(
      equals(0),
      prop('length')
    )
  )(items);

export const hasValue = val => !isEmpty(val) && Boolean(val);

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function removeEmpties(obj) {
  if (!obj) {
    return obj;
  }
  return filter(
    compose(
      not,
      isEmpty
    ),
    obj
  );
}

export const capitalize = replace(/^./, toUpper);

export function parseEventValue(valueObj) {
  if (valueObj.target) {
    if (valueObj.target.type === 'checkbox') {
      return valueObj.target.checked;
    }
    return valueObj.target.value;
  }
  return valueObj;
}

export function getDisplayValue(value, defaultValue = '—') {
  return value ? value : defaultValue;
}
