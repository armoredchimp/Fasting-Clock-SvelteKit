<script lang="ts">
    import { Amplify } from 'aws-amplify';
    import amplifyConfig from '$lib/auth/amplify/amplifyConfig';
    import { getCurrentUser, fetchAuthSession, fetchUserAttributes, updateUserAttribute} from 'aws-amplify/auth';
    import { onMount } from 'svelte';
    import { userStore, user } from '$lib/auth/userStore';
    import { hours, currPerc, startDate, futureDate, hasStarted, succeeded, loading, currPage, totalTime, theme } from '$lib/stores';
    import axios from 'axios';
    // import { aws_stages } from '../aws/stages';
    import { slide } from 'svelte/transition'
    import { navigating } from '$app/stores';
    import Login from '$lib/Login.svelte';
    import Logout from '$lib/Logout.svelte';
    import Register from '$lib/Register.svelte';
    import '../app.css'
    
    Amplify.configure(amplifyConfig);
    
 

    let activeSubmenu = null;
    let showReg = false;
    let showLogin = false;
    let submenuTimer: number | null = null

    $: if (){
       
    }
    $: if ($navigating){
        closeSubmenu()
    }

    onMount(async () =>{
        await checkAuth()
    })
    
    function setTheme(theme){
        if($theme !== theme){
            document.body.classList.remove('nature','ocean','warmth');
            if(theme !== 'default'){
                document.body.classList.add(theme)
            }
            $theme = theme
            handleAttributeUpdate('custom:theme', $theme)
        }
    }
        

    function setThemeOnMount(theme){
        if($theme !== theme){
        document.body.classList.remove('nature','ocean','warmth');
        if(theme !== 'default'){
            document.body.classList.add(theme)
        }
            $theme = theme
        }
    }

    
    async function handleAttributeUpdate(attributeKey, value) {
        try {
            await updateUserAttribute({
                userAttribute: {
                    attributeKey,
                    value
                }
            })
            console.log(`${attributeKey} updated to ${value}`)
        } catch(err){
            console.log(err)
        }
    }

    async function retrieveUserAttributes(){
        const atts = await fetchUserAttributes()
        console.log(atts)
        console.log(atts['custom:theme'])
        if(atts){
            setThemeOnMount(atts['custom:theme'])
        }
    }

    async function checkAuth(){
        try {
            const {tokens} = await fetchAuthSession();
            $loading = true;
            if(tokens){
               
                const currentUser = await getCurrentUser();
                userStore.setUser(currentUser)
                await retrieveUserAttributes()
                await checkActiveFast(currentUser.username)
                $loading = false
            }else {
                userStore.reset()
                $loading = false
            }
        } catch (err){
            console.error('Not authenticated', err)
            userStore.reset()
            $loading = false
        }
    }
    
    async function checkActiveFast(username: string){
    try {
        $loading = true;
        // const url = aws_stages.API_GET_URL.replace("{username}", username);
        const url = import.meta.env.VITE_API_GET_URL.replace("{username}", username);
        const response = await axios.get(url);
        const activeFast = response.data;

        if (activeFast){
            console.log("Active fast data: ", activeFast);
            hours.set(Number(activeFast.ExpectedDuration));
            currPerc.set(Number(activeFast.PercentRemaining));
            startDate.set(new Date(Number(activeFast.StartDate)));
            futureDate.set(new Date(Number(activeFast.EndDate)));
            hasStarted.set(true);
            succeeded.set(activeFast.Succeeded);
            $loading = false;
           
            console.log("Stores after setting:", {
                hours: $hours,
                currPerc: $currPerc,
                startDate: $startDate,
                futureDate: $futureDate,
                hasStarted: $hasStarted,
                succeeded: $succeeded,
                totalTime: $totalTime
            });
        } else {
            console.log('Error loading active fast')
            hasStarted.set(false);
            succeeded.set(false);
            $loading = false;
        }
    } catch(err) {
        console.log('Critical error')
        console.error(err);
        $loading = false;
    }
}
    
    function toggleAuth(type){
        if (type === 'register') {
            showReg = !showReg;
            showLogin = false;
        } else if (type === 'login') {
            showLogin = !showLogin;
            showReg = false;
        }
    }
    
    function toggleSubmenu(menu){
        if (activeSubmenu === menu){
            closeSubmenu();
        } else {
            if (submenuTimer){
                clearTimeout(submenuTimer)
            }
            activeSubmenu = menu;
            submenuTimer = setTimeout(()=>{
                closeSubmenu()
            }, 4000)
        }
    }
    
    function clearSubmenuTimer(){
        if (submenuTimer){
            clearTimeout(submenuTimer)
            submenuTimer = null;
        }
    }

    function closeSubmenu(){
        if(!showReg && !showLogin){
            activeSubmenu = null;
            showReg = false;
            showLogin = false;

        }
    }
    
    </script>
    <style>
            @font-face {
            font-family: 'Plus Jakarta Sans Variable';
            font-style: normal;
            font-display: swap;
            /* color: #4777ad4b; */
            font-weight: 200 800;
            src: url(https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans:vf@latest/latin-wght-normal.woff2) format('woff2-variations');
            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
    }
    
    h1, h2, h3, h4, p {
        font-family: 'Plus Jakarta Sans Variable';
    }
    
    .top-bar {
        padding-top: 2rem;
        padding-bottom: 2rem;
        display: flex;
        justify-content: space-around;
        background-color: var(--primary-color);
        position: relative;
        z-index: 1001;
    }
    
        .submenu {
            position: absolute;
            left: 0;
            right: 0;
            background-color: var(--primary-color);
            padding: 0.5rem 0;
            padding-bottom: 1.5rem;
            display: flex;
            justify-content: space-evenly;
            transform: translateY(-0.8rem);
            z-index: 1002;
        }
    
        .auth-cont {
            position: fixed;
            top: 5rem;
            left: 0;
            width: 20rem;
            background-color: var(--primary-color);
            border-bottom-right-radius: 1rem;
            z-index: 1000;
            padding: 2rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1), 1px 0 2px rgba(0,0,0,0.05);
            border-top: none;
            margin-top: -1px;
        }
    
        .login {
            height: 17rem;
        }
     
    .nav-item {
        font-size: 0.9rem;
        cursor: pointer;
    }
    
    .nav-item a {
        text-decoration: none;
        color: #e4dede;
        cursor: pointer;
        transition: color 0.3s ease;
    }


    .nav-item a:hover {
        color: #c5c2c2;
    }

    .nav-item a:active {
        color: #aaaaaa;
    }

        .nav-item:hover {
            color: #c5c2c2;
            
        }
    
        .nav-item:active {
            color: #aaaaaa;
        }
    
        a {
            text-decoration: none;
            color: #e4dede
        }
    
        h4 {
            font-size: 0.9rem;
        }
       
        .registerBtn, .loginBtn {
            background: none;
            padding: 0;
            border: none;
            cursor: pointer;
            color: #e4dede;
            font: inherit;
            transition: color 0.3s ease;
        }
    
        .registerBtn:hover, .loginBtn:hover {
            color: #c5c2c2;
        }

        .current-page {
            color: var(--rare-color) !important;
        }
    </style>
    
    <svelte:head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@event-calendar/build@3.2.1/event-calendar.min.css">
    </svelte:head>
    
    

    <div class="top-bar">
        <h4 class="nav-item"><a href='/' class:current-page={$currPage === '/'}>Clock</a></h4>
        <h4 class="nav-item"><a href='#' on:mouseenter={() => toggleSubmenu('history')} class:current-page={$currPage.startsWith('/history')}>History</a></h4>
        <h4 class="nav-item"><a href='/analytics' class:current-page={$currPage === '/analytics'}>Analytics</a></h4>
        <h4 class="nav-item"><a href='#' on:mouseenter={() => toggleSubmenu('theme')}>Theme</a></h4>
        <h4 class="nav-item"><a href='/about' class:current-page={$currPage === '/about'}>About</a></h4>
        <h4 class="nav-item">
            <a href='#' on:mouseenter={() => toggleSubmenu('user')}>
                {#if $user !== null}
                    {$user.username}
                {:else}
                    Sign In
                {/if}
            </a>
        </h4>        
    </div>
    
    {#if activeSubmenu === 'theme'}
    <div class="submenu" 
         transition:slide={{ duration: 300, axis: 'y'}}
         on:mouseenter={clearSubmenuTimer}
         on:mouseleave={() => submenuTimer = setTimeout(closeSubmenu, 6000)}>
        <div class="nav-item" on:click={() => setTheme('default')}>Default</div>
        <div class="nav-item" on:click={() => setTheme('nature')}>Nature</div>
        <div class="nav-item" on:click={() => setTheme('ocean')}>Ocean</div>
        <div class="nav-item" on:click={() => setTheme('warmth')}>Warmth</div>   
    </div>
{/if}
    
{#if activeSubmenu === 'history'}
    <div class="submenu" 
         transition:slide={{ duration: 300, axis: 'y'}}
         on:mouseenter={clearSubmenuTimer}
         on:mouseleave={() => submenuTimer = setTimeout(closeSubmenu, 6000)}>
        <a href="/history/calendar" class:current-page={$currPage.startsWith('/history/calendar')}>Calendar</a>   
        <a href="/history/record" class:current-page={$currPage.startsWith('/history/record')}>Record</a>   
    </div>
{/if}

{#if activeSubmenu === 'user'}
    <div class="submenu" 
         transition:slide={{ duration: 300, axis: 'y'}}
         on:mouseenter={clearSubmenuTimer}
         on:mouseleave={() => submenuTimer = setTimeout(closeSubmenu, 3000)}>
        {#if $user !== null}
            <a href="/user/profile">Profile</a>
            <a href="/user/settings">Settings</a>
            <Logout/>
        {:else}
            <button class="registerBtn" on:click={() => toggleAuth('register')}>Register</button>    
            <button class="loginBtn" on:click={() => toggleAuth('login')}>Login</button>  
        {/if}    
    </div>
{/if}
    {#if showLogin}
         <div class="auth-cont login" transition:slide={{ duration: 300, axis: 'x'}}>
            <Login />
         </div>
    {/if}
    
    {#if showReg}
         <div class="auth-cont" transition:slide={{ duration: 300, axis: 'x'}}>
            <Register />
         </div>
    {/if}
    
    <slot />
    
    
    <!-- {#if activeSubmenu === 'theme'}
        <div class="submenu" transition:slide={{ duration: 300, axis: 'y'}}>
                <a href="/theme1">Theme 1</a>   
         </div>
    {/if}
    
    {#if activeSubmenu === 'user'}
        <div class="submenu" transition:slide={{ duration: 300, axis: 'y'}}>
            {#if $user !== null}
                <a href="/profile">Profile</a>
                <a href="/settings">Settings</a>
                <Logout />
            {/if}    
         </div>
    {/if} -->