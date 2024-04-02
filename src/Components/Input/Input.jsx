import cn from 'classnames';
import slyles from './Input.module.css';
import {forwardRef} from 'react';

const Input = forwardRef(function Input({classNames, isValid = true, appearence, ...props}, ref) {

	return (

		<input {...props} ref={ref} className={cn(classNames, slyles['input'], {
			[slyles.invalid]: !isValid,
			[slyles['input-title']]: appearence === 'title'
		})}/>

	);
});

export default Input;