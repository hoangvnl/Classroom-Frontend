import { createSelector } from "reselect";

const selectorClassrooms = (state) => state.classrooms;

export const selectClassrooms = createSelector(
  [selectorClassrooms],
  (clasrooms) => clasrooms.classrooms
);

export const selectIsFetchingClassrooms = createSelector(
  [selectorClassrooms],
  (clasrooms) => clasrooms.isFetchingClassrooms
);

export const selectIsJoiningClassroom = createSelector(
  [selectorClassrooms],
  (clasrooms) => clasrooms.isJoining
);

export const selectError = createSelector(
  [selectorClassrooms],
  (clasrooms) => clasrooms.classroomError
);

export const selectJoinClassroomError = createSelector(
  [selectorClassrooms],
  (clasrooms) => clasrooms.joinClassroomErrorMessage
);
