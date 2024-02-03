import { UnknownAction } from 'redux';

type Matchable<AC extends () => UnknownAction> = AC & {
  type: ReturnType<AC>['type'];
  match(action: UnknownAction): action is ReturnType<AC>;
};

export function withMatcher<AC extends () => UnknownAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

export function withMatcher<
  AC extends (...args: never[]) => UnknownAction & { type: string },
>(actionCreator: AC): Matchable<AC>;

export function withMatcher(
  actionCreator: (...args: never[]) => UnknownAction & { type: string }
) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: UnknownAction) {
      return action.type === type;
    },
  });
}

export type Action<T> = {
  type: T;
};

export type ActionWithPayload<T, P> = Action<T> & {
  payload: P;
};

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
