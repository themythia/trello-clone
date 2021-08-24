import { combineReducers } from 'redux';
import data from './data';
import menu from './menu';
import labels from './labels';

export default combineReducers({ data, menu, labels });
