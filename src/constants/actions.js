const restHelper = (action) => {
  actionType[`${action}_PENDING`] = `${action}_PENDING`;
  actionType[`${action}_SUCCESS`] = `${action}_SUCCESS`;
  actionType[`${action}_REJECT`] = `${action}_REJECT`;
};
const actionType = {
  SET_CHARTS: 'SET_CHARTS',
  ADD_LAYER: 'ADD_LAYER',
  REMOVE_LAYER: 'REMOVE_LAYER',
  ADD_CRUMB: 'ADD_CRUMB',
  REMOVE_CRUMB: 'REMOVE_CRUMB',
  SET_PROP: 'SET_PROP',
  SELECT_LAYER: 'SELECT_LAYER',
  TOGGLE_HIDDEN: 'TOGGLE_HIDDEN',
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  SEND_TERMINAL_INPUT: 'SEND_TERMINAL_INPUT',
  TERMINAL_DISCONNECTED: 'TERMINAL_DISCONNECTED',
  TERMINAL_CONNECTED: 'TERMINAL_CONNECTED',
  OPEN_TERMINAL_CLIENT: 'OPEN_TERMINAL_CLIENT',
  CLOSE_TERMINAL_CLIENT: 'CLOSE_TERMINAL_CLIENT',
  CLEAR_CLIENT_TERMINAL: 'CLEAR_CLIENT_TERMINAL',
  SOCKET_INIT: 'SOCKET_INIT',
  SOCKET_RECIVING_TERMINAL_FROM_SERVER: 'SOCKET_RECIVING_TERMINAL_FROM_SERVER',
  UPDATE_FILTER: 'UPDATE_FILTER',
  UPDATE_ROW_DATA_TABLE: 'UPDATE_ROW_DATA_TABLE',
  GET_CONFIG: 'GET_CONFIG',
  REST_REQ: 'REST_REQ',
  REST_REQ_CONFIG: 'REST_REQ_CONFIG',
  REST_REQ_POST: 'REST_REQ_POST',
  REST_REQ_DELETE: 'REST_REQ_DELETE',
  REST_REQ_PUT: 'REST_REQ_PUT',
  UPDATE_SERVER_CONNECTION: 'UPDATE_SERVER_CONNECTION',
  ALGORITHM_ADD: 'ALGORITHM_ADD',
  ALGORITHM_DELETE: 'ALGORITHM_DELETE',
  ALGORITHM_STORE: 'ALGORITHM_STORE',
  ALGORITHM_STORE_REMOVE: 'ALGORITHM_STORE_REMOVE',
  ADD_PIPE: 'ADD_PIPE',
  EXEC_STORED_PIPE: 'EXEC_STORED_PIPE',
  DELETE_STORED_PIPE: 'DELETE_STORED_PIPE',
  JAEGER_REST: 'JAEGER_REST',
  EXEC_RAW_PIPELINE:'EXEC_RAW_PIPELINE',
  STOP_PIPELINE:'STOP_PIPELINE',
  UPDATE_STORED_PIPELINE:'UPDATE_STORED_PIPELINE',
  KUBERNETES_LOGS_REST:"KUBERNETES_LOGS_REST",
  OPEN_SIDEBAR:"OPEN_SIDEBAR",
  CLOSE_SIDEBAR:"CLOSE_SIDEBAR",
  EXEC_CACHING:"EXEC_CACHING",
  CRON_START: "CRON_START",
  CRON_STOP: "CRON_STOP"
};
restHelper(actionType.GET_CONFIG);
restHelper(actionType.ALGORITHM_ADD);
restHelper(actionType.ALGORITHM_DELETE);

export default actionType;
