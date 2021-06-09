export default function (
  state = { footballers: [], message: null },
  action: any,
) {
  switch (action.type) {
    case 'FOOTBALLERS_FETCH_SUCCEEDED':
      return { footballers: action.footballers, message: 'success' };
    case 'FOOTBALLERS_FETCH_FAILED':
      return { footballers: [], message: action.message };
    default:
      return state;
  }
}
