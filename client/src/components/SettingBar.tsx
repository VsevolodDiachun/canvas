import React, {FC} from 'react';
import style from '../styles/toolbar.module.scss';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import { toolSlice } from '../store/reducers/ToolSlice';


const SettingBar: FC = () => {
      const {setLineWidth, setStrokeColor} = toolSlice.actions
    const {strokeColorValue} = useAppSelector(state => state.toolReducer)
      const dispatch = useAppDispatch()
      return (
            <div className={style.settingBar}>
                  <label 
                        htmlFor='line-width' 
                        className={style.settingBar__lable}
                  >
                        Товщина лінії:
                  </label>
                  <input 
                        onChange={e => dispatch(setLineWidth(+e.target.value))}
                        id='line-width' 
                        className={style.settingBar__input} 
                        type="number" 
                        defaultValue={1} 
                        min={1} 
                        max={50}
                  />
                  <label 
                        htmlFor='stroke-color' 
                        className={style.settingBar__lable}
                  >
                        Колір обведення:
                  </label>
                  <input 
                        id='stroke-color' 
                        type='color' 
                        className={style.settingBar__input}
                        value={strokeColorValue}
                        onChange={e => dispatch(setStrokeColor(e.target.value))}
                  />
            </div>
      );
};

export default SettingBar;