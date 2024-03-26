import slyles from './JornalForm.module.css';
import Button from '../Button/Button';
import {useEffect, useReducer} from 'react';
import cn from 'classnames';
import {formReducer, INITIAL_STATE} from './form.stata.js';


function JornalForm({onSubmit}) {

	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;

	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.date.text || !isValid.date.title) {
			timerId = setTimeout(() => {
				dispatchForm({type: 'RESET_VALIDITY'});
			}, 2000);
		}

		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({type: 'CLEAR'});
		}

	}, [isFormReadyToSubmit]);

	const onChange = (event) => {
		dispatchForm({type: 'SET_VALUE', payload: {[event.target.name]: event.target.value}});
	};

	const addJornalItem = (event) => {
		event.preventDefault();
		dispatchForm({type: 'SUBMIT'});

	};

	return (


		<form className={slyles['jornal-form']} onSubmit={addJornalItem}>
			<div>
				<input type="text" value={values.title} onChange={onChange} name="title" className={cn(slyles['input-title'], {
					[slyles.invalid]: !isValid.title
				})}/>
			</div>
			<div className={slyles['form-row']}>
				<label htmlFor="date" className={slyles['form-label']}>
					<img src="/calendar.svg" alt=""/>
					<span>Дата</span>
				</label>
				<input type="date" onChange={onChange} value={values.date} name="date" id="date"  className={cn(slyles.input, {
					[slyles.invalid]: !isValid.date
				})}/>
			</div>
			<div className={slyles['form-row']}>
				<label htmlFor="teg" className={slyles['form-label']}>
					<img src="/teg.svg" alt=""/>
					<span>Метки</span>
				</label>
				<input type="text" onChange={onChange} value={values.teg} name="teg" id="teg" className={cn(slyles.input)}/>
			</div>
			<textarea name="text" onChange={onChange} value={values.text} id="" cols="30" rows="10" className={cn(slyles.input, {
				[slyles.invalid]: !isValid.text
			})}></textarea>
			<Button text="Сохранить"/>
		</form>

	);

}

export default JornalForm;