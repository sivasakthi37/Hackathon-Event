


// export const genericAsyncAction = ({
//   action,
//   path,
//   authToken,
//   method,
//   params = {},
//   meta = {},
//   headers = {}
// }) => {
//   return async dispatch => {
//     try {
//       const data = await Axiosplus[method]({
//         path,
//         values: { ...params },
//         config: { headers: { Authorization: authToken, ...headers } }
//       });
//       if (data) {
//         dispatch({
//           type: action,
//           data,
//           meta
//         });
//         return data;
//       }
//     } catch (e) {
//       throw e;
//     }
//   };
// };

// export const genericSyncAction = ({ type, data = {}, meta = {} }) => ({
//   type,
//   data,
//   meta
// });

export const increment = data => ({
  type: "INCREMENT",
  data
});

export const api = (data) => {
  return {
    type: "API_DATA",
    data
  };
};
