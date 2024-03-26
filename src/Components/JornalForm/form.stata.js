export const INITIAL_STATE = {
	isValid: {
		title: true,
		text: true,
		date: true
	},
	values: {
		title: '',
		text: '',
		date: '',
		teg: ''
	},
	isFormReadyToSubmit: false
};


export function formReducer(state, action) {
	switch (action.type) {
	case 'RESET_VALIDITY':
		return {...state, isValid: INITIAL_STATE.isValid};
	case 'SUBMIT': {
		const titleValidity = state.values.title?.trim().length;
		const postValidity = state.values.text?.trim().length;
		const dateValidity = state.values.date;

		return {
			...state,
			isValid: {
				title: titleValidity,
				text: postValidity,
				date: dateValidity
			},
			isFormReadyToSubmit: titleValidity && postValidity && dateValidity
		};
	}
	case 'CLEAR': {
		return {...state, values: INITIAL_STATE.values};
	}
	case 'SET_VALUE': {
		return {...state, values: {...state.values, ...action.payload}};
	}
	}

}