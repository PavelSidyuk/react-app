import slyles from './JornalForm.module.css';
import Button from '../Button/Button';
import {useContext, useEffect, useReducer, useRef} from 'react';
import cn from 'classnames';
import {formReducer, INITIAL_STATE} from './form.stata.js';
import Input from '../Input/Input.jsx';
import {UserContext} from '../../Context/user.context.jsx';


function JornalForm({onSubmit, data, onDelete}) {

	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();
	const {userId} = useContext(UserContext);

	const focusError = (isValid) => {
		switch (true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.text:
			textRef.current.focus();
			break;
		}

	};

	useEffect(() => {
		if(!data){
			dispatchForm({type: 'CLEAR'});
			dispatchForm({type: 'SET_VALUE', payload: {userId}});
		}
		dispatchForm({type: 'SET_VALUE', payload: {...data}});
	}, [data]);

	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.text || !isValid.title) {
			focusError(isValid);
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
			dispatchForm({type: 'SET_VALUE', payload: {userId}});
		}

	}, [isFormReadyToSubmit, values, onSubmit, userId]);

	useEffect(() => {
		dispatchForm({type: 'SET_VALUE', payload: {userId}});
	}, [userId]);
	const onChange = (event) => {
		dispatchForm({type: 'SET_VALUE', payload: {[event.target.name]: event.target.value}});
	};

	const addJornalItem = (event) => {
		event.preventDefault();
		dispatchForm({type: 'SUBMIT'});

	};

	const deleteJornalItem = () => {
		onDelete(data.id);
		dispatchForm({type: 'CLEAR'});
		dispatchForm({type: 'SET_VALUE', payload: {userId}});
	};

	return (

		<form className={slyles['jornal-form']} onSubmit={addJornalItem}>
			<div className={slyles['form-row']}>
				<Input type="text" ref={titleRef} value={values.title} isValid={isValid.title}
					   onChange={onChange}
					   name="title" appearence="title"/>
				{data?.id && <button className={slyles['delete']} type="button" onClick={deleteJornalItem}>
					<img src="/delet.svg" alt=""/>
				</button>}
			</div>
			<div className={slyles['form-row']}>
				<label htmlFor="date" className={slyles['form-label']}>
					<img src="/calendar.svg" alt=""/>
					<span>Дата</span>
				</label>
				<Input type="date" ref={dateRef} onChange={onChange} isValid={isValid.date}
					   value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''}
					   name="date" id="date"/>
			</div>
			<div className={slyles['form-row']}>
				<label htmlFor="teg" className={slyles['form-label']}>
					<img src="/teg.svg" alt=""/>
					<span>Метки</span>
				</label>
				<Input type="text" onChange={onChange} value={values.teg} name="teg" id="teg"/>
			</div>
			<textarea name="text" ref={textRef} onChange={onChange} value={values.text} id="" cols="30"
					  rows="10"
					  className={cn(slyles.input, {
						  [slyles.invalid]: !isValid.text
					  })}>
				</textarea>
			<Button text="Сохранить"/>
		</form>

	);

}

export default JornalForm;