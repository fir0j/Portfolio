const INITIAL_STATE = {
	currentUser: null
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
	console.log('type is', type, 'payload is', payload);
	switch (type) {
		case 'SET_CURRENT_USER':
			return {
				...state,
				currentUser: payload
			};
		default:
			return state;
	}
};

export default userReducer;
