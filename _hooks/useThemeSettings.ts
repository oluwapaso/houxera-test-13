import { AppDispatch } from "@/app/GlobalRedux/store";
import { LoadThemeSettings } from "@/app/GlobalRedux/theme/themeSlice";
import { useDispatch } from "react-redux"; 

const useThemeSettings = async () => {

    const dispatch = useDispatch<AppDispatch>(); 
    const resp = await dispatch(LoadThemeSettings({ theme_name: "Default Theme", }))
    if (resp.type == "theme/settings/rejected") {

        const cast_resp = resp as any
        return cast_resp.error.message || resp.payload

    } else if (resp.type == "theme/settings/fulfilled") {
        const payload = resp?.payload as any;
        return payload.data;
    }
 
}

export default useThemeSettings