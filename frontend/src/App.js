import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoute";
import { ToastProvider } from "./context/ToastContext";
import store from "./redux/store";

const queryClient = new QueryClient();

function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <ToastProvider>
                        <AppRoutes />
                    </ToastProvider>
                </Router>
            </QueryClientProvider>
        </Provider>
    );
}

export default App;
