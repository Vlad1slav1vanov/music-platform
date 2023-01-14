import { createTheme, Theme } from '@mui/material/styles';

const themeJson = '{"palette":{"common":{"black":"#000","white":"#fff"},"background":{"paper":"#000000","default":"#201F1F"},"primary":{"light":"rgba(134, 242, 71, 1)","main":"rgba(32, 198, 64, 1)","dark":"rgba(14, 161, 6, 1)","contrastText":"rgba(255, 255, 255, 1)"},"secondary":{"light":"rgba(228, 80, 129, 1)","main":"rgba(234, 59, 121, 1)","dark":"rgba(165, 7, 78, 1)","contrastText":"#fff"},"error":{"light":"rgba(235, 62, 62, 1)","main":"rgba(208, 2, 27, 1)","dark":"#d32f2f","contrastText":"#fff"},"text":{"primary":"rgba(255, 255, 255, 0.87)","secondary":"rgba(255, 255, 255, 0.54)","disabled":"rgba(185, 181, 181, 0.38)","hint":"rgba(241, 241, 241, 0.38)"}}}'

const theme: Theme = createTheme(JSON.parse(themeJson))

export default theme;
