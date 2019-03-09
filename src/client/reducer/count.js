/**
 * Created by Raion on 2019/3/9.
 */

export default function count(state = 1, action) {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    default:
      return state;
  }
}
