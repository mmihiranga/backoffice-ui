/* eslint-disable @typescript-eslint/no-restricted-imports */
import type {TypedUseSelectorHook} from 'react-redux';
import {useSelector} from 'react-redux';

import {RootState} from '../store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
