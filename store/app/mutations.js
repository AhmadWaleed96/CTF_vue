export default {
    setDrawer: (state, value) => (state.drawer = value),
    setColor: (state, value) => (state.color = value),
    toggleDrawer: (state) => (state.drawer = !state.drawer),
};
