import _extends from "@babel/runtime/helpers/esm/extends";
import { NumberInputActionTypes } from './numberInputAction.types';
import { clamp, isNumber } from './utils';

// extracted from handleValueChange
function getClampedValues(rawValue, context) {
  var min = context.min,
    max = context.max,
    step = context.step;
  var clampedValue = rawValue === undefined ? '' : clamp(rawValue, min, max, step);
  var newInputValue = clampedValue === undefined ? '' : String(clampedValue);
  return {
    value: clampedValue,
    inputValue: newInputValue
  };
}
function stepValue(state, context, direction, multiplier) {
  var value = state.value;
  var _context$step = context.step,
    step = _context$step === void 0 ? 1 : _context$step,
    min = context.min,
    max = context.max;
  if (isNumber(value)) {
    return {
      up: value + (step != null ? step : 1) * multiplier,
      down: value - (step != null ? step : 1) * multiplier
    }[direction];
  }
  return {
    up: min != null ? min : 0,
    down: max != null ? max : 0
  }[direction];
}
function handleClamp(state, context, inputValue) {
  var getInputValueAsString = context.getInputValueAsString;
  var numberValueAsString = getInputValueAsString(inputValue);
  var intermediateValue = numberValueAsString === '' || numberValueAsString === '-' ? undefined : parseInt(numberValueAsString, 10);
  var clampedValues = getClampedValues(intermediateValue, context);
  return _extends({}, state, clampedValues);
}
function handleInputChange(state, context, inputValue) {
  var getInputValueAsString = context.getInputValueAsString;
  var numberValueAsString = getInputValueAsString(inputValue);
  if (numberValueAsString === '' || numberValueAsString === '-') {
    return _extends({}, state, {
      inputValue: numberValueAsString,
      value: ''
    });
  }
  if (numberValueAsString.match(/^-?\d+?$/)) {
    return _extends({}, state, {
      inputValue: numberValueAsString,
      value: parseInt(numberValueAsString, 10)
    });
  }
  return state;
}

// use this for ArrowUp, ArrowDown, button clicks
// use this with applyMultiplier: true for PageUp, PageDown, button shift-clicks
function handleStep(state, context, applyMultiplier, direction) {
  var multiplier = applyMultiplier ? context.shiftMultiplier : 1;
  var newValue = stepValue(state, context, direction, multiplier);
  var clampedValues = getClampedValues(newValue, context);
  return _extends({}, state, clampedValues);
}
function handleToMinOrMax(state, context, to) {
  var newValue = context[to];
  if (!isNumber(newValue)) {
    return state;
  }
  return _extends({}, state, {
    value: newValue,
    inputValue: String(newValue)
  });
}
export function numberInputReducer(state, action) {
  var type = action.type,
    context = action.context;
  switch (type) {
    case NumberInputActionTypes.clamp:
      return handleClamp(state, context, action.inputValue);
    case NumberInputActionTypes.inputChange:
      return handleInputChange(state, context, action.inputValue);
    case NumberInputActionTypes.increment:
      return handleStep(state, context, action.applyMultiplier, 'up');
    case NumberInputActionTypes.decrement:
      return handleStep(state, context, action.applyMultiplier, 'down');
    case NumberInputActionTypes.incrementToMax:
      return handleToMinOrMax(state, context, 'max');
    case NumberInputActionTypes.decrementToMin:
      return handleToMinOrMax(state, context, 'min');
    default:
      return state;
  }
}