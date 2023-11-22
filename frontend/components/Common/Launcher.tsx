'use client';
import { setData, setIsLaptop } from "@/redux/miscSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from '@/redux/hooks';
import { setAuthData, setUserpic } from "@/redux/authSlice";
import axios from "axios";
import { Text, useToast } from "@chakra-ui/react";
import { api } from "@/utils/api";
import { toasts } from "@/utils/misc";

export function Launcher() {
    const dispatch = useDispatch();
    const toast = useToast();
    const { version } = useSelector(state => state.misc);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(setIsLaptop(!window.matchMedia("(max-width: 600px)").matches));
        dispatch(setData(JSON.parse(localStorage.getItem('ivbo_data') ?? '{}')));
        dispatch(setUserpic(localStorage.getItem('tg_userpic') ?? ''));
        // dispatch(setShowHW(localStorage.getItem('ivbo_showHW') === 'true'));

        axios.get('https://api.twodev.cc/ivbo/data').then(res => {
            dispatch(setData(res.data));
            localStorage.setItem('ivbo_data', JSON.stringify(res.data));
        });

        // if (localStorage.getItem('weeksDisplayCount')) dispatch(setWeeksDisplayCount(localStorage.getItem('weeksDisplayCount') ?? '0|5'));

        // if (!localStorage.getItem('weeksDisplayCount')) localStorage.setItem('weeksDisplayCount', '4');
        // else dispatch(setWeeksDisplayCount(parseInt(localStorage.getItem('weeksDisplayCount') ?? '4')));

        if (!user && localStorage.getItem('ivbo_auth')) {
            const token = localStorage.getItem('ivbo_auth');
            if (!token) return localStorage.removeItem('ivbo_auth');

            api.get('/auth/users/me', { headers: { Authorization: localStorage.getItem('ivbo_auth') } })
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => toast(toasts.error(err)));
        }

        // if (!user && localStorage.getItem('ivbo_token')) axios.post('https://api.twodev.cc/ivbo/login', { hash: localStorage.getItem('ivbo_token') }).then(res => {
        //     if (res.data === 500) {
        //         localStorage.removeItem('ivbo_token');
        //         dispatch({ type: 'socket/connect', payload: 'unknown' });
        //     } else {
        //         dispatch(setAuthData(res.data));
        //         dispatch({ type: 'socket/connect', payload: res.data.user.tg_id.toString() });
        //     }
        // });
        // else dispatch({ type: 'socket/connect', payload: 'unknown' });
    }, [dispatch, user, version, toast]);

    return <>
        <Text fontSize='14px' color='white' opacity={0.5} pos='fixed' top={2} right={3} zIndex={10}>{version}</Text>
    </>
}