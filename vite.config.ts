// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { dirname, resolve as pResolve } from "node:path";
import AutoImport from "unplugin-auto-import/vite";

const __dirname = dirname(__filename);

const base = process.env.BASE_PATH || "/";

export default defineConfig({
  define: {
    __BASE_PATH__: JSON.stringify(base),
  },
  plugins: [
    react(),
    AutoImport({
      imports: [
        // React 훅/유틸만
        {
          react: [
            "useState",
            "useEffect",
            "useContext",
            "useReducer",
            "useCallback",
            "useMemo",
            "useRef",
            "useImperativeHandle",
            "useLayoutEffect",
            "useDebugValue",
            "useDeferredValue",
            "useId",
            "useInsertionEffect",
            "useSyncExternalStore",
            "useTransition",
            "startTransition",
            "lazy",
            "memo",
            "forwardRef",
            "createContext",
            "createElement",
            "cloneElement",
            "isValidElement",
            "StrictMode",
          ],
        },
        {
          "react-router-dom": [
            "useNavigate",
            "useLocation",
            "useParams",
            "useSearchParams",
          ],
        },
      ],
      // 타입 선언 파일 경로 명시(에디터 친화)
      dts: "src/auto-imports.d.ts",
      // ESLint 사용 시 권장(자동 import된 전역 식별자 인식)
      eslintrc: {
        enabled: true,
        filepath: "./eslint.config.js",
        globalsPropValue: true,
      },
    }),
  ],
  base,
  resolve: {
    alias: {
      "@": pResolve(__dirname, "./src"),
    },
  },
});
