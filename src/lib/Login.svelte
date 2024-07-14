<script>
    import {createForm} from "svelte-forms-lib"
    import { signIn, getCurrentUser } from 'aws-amplify/auth';
    import { user, userStore } from '$lib/auth/userStore';

    const { form, errors, handleChange, handleSubmit } = createForm({
        initialValues: {
            username: '',
            password: '',
        },
        validate: (values) => {
            let errors = {};
            if (!values.username) errors.username = 'Username is required';
            if (!values.password) errors.password = 'Password is required';
            return errors;
        },
        onSubmit: async (values) => {
            try {
                await handleLogin(values);
            } catch (err) {
                console.error('Error', err);
            }
        }
    }); 

    async function handleLogin(values) {
        try {
            const { isSignedIn, nextStep } = await signIn({
                username: values.username,
                password: values.password,
            });
            if (isSignedIn) {
                const currentUser = await getCurrentUser();
                userStore.setUser(currentUser);
                //Refresh the page to trigger the +layout mount functionality and check for an active fast
                window.location.reload();
            } else {
                console.log('Failed to Login');
            }
        } catch(err) {
            console.error('Login error', err);
        }
    }
</script>

<style>
    .login-cont {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        background-color: rgb(73, 104, 104);
        padding: 2rem 2rem 3rem 1rem;
    }

    .form-group {
        flex: 1;
        margin-bottom: 0.7rem;
    }
    input {
        width: 100%;
        padding: 5px;
        border: 1px solid #a5d6a7;
        border-radius: 4px;
    }
    .error {
        color: #c62828;
        font-size: 0.7em;
    }
    button {
        background: none;
        color: white;
        padding: 7px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 2rem;
        font-size: 14px;
        width: auto;
        min-width: 100px;
        transition: background-color 0.3s color 0.3s;
        margin-right: 2rem;
        align-self: flex-end;
    }
    button:hover {
        background-color: rgb(105, 20, 105);
    }
</style>

<div class="login-cont">
    <form on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
            <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                bind:value={$form.username}
                on:change={handleChange}
            />
            {#if $errors.username}
                <span class="error">{$errors.username}</span>
            {/if}
        </div>

        <div class="form-group">
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                bind:value={$form.password}
                on:change={handleChange}
            />
            {#if $errors.password}
                <span class="error">{$errors.password}</span>
            {/if}
        </div>

        <button type="submit">Login</button>
    </form>
</div>
<!-- <script>
    import { createForm } from "svelte-forms-lib";
    import { signIn, getCurrentUser } from 'aws-amplify/auth';
    import { user, userStore } from '$lib/auth/userStore';


    const { form, errors, handleChange, handleSubmit } = createForm({
        initialValues: {
            username: '',
            password: '',
        },
        validate: (values) => {
            let errors = {};
            if (!values.username) errors.username = 'Username is required';
            if (!values.password) errors.password = 'Password is required';
            return errors;
        },
        onSubmit: async (values) => {
            try {
                await handleLogin(values);
            } catch (err) {
                console.error('Error', err);
            }
        }
    });


    async function handleLogin(values) {
        try {
            const { isSignedIn, nextStep } = await signIn({
                username: values.username,
                password: values.password,
            });
            if (isSignedIn) {
                const currentUser = await getCurrentUser();
                userStore.setUser(currentUser);
                //Refresh the page to trigger the +layout mount functionality and check for an active fast
                window.location.reload();
            } else {
                console.log('Failed to Login');
            }
        } catch(err) {
            console.error('Login error', err);
        }
    }
</script>

<style>
    .login-container {
        background-color: #e3f2fd;
        border-radius: 8px;
        padding: 20px;
        max-width: 400px;
        margin: 0 auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    form {
        display: flex;
        flex-direction: column;
    }
    h2 {
        color: #1565c0;
        text-align: center;
        margin-bottom: 20px;
    }
    .form-group {
        margin-bottom: 15px;
    }
    label {
        display: block;
        margin-bottom: 5px;
        color: #0d47a1;
    }
    input {
        width: 100%;
        padding: 8px;
        border: 1px solid #90caf9;
        border-radius: 4px;
    }
    .error {
        color: #c62828;
        font-size: 0.8em;
        margin-top: 5px;
    }
    button {
        background-color: #2196f3;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s;
    }
    button:hover {
        background-color: #1e88e5;
    }
</style>
{#if $user !== null}
    <h1>Logged in as {$user.username}</h1>
{:else}
    <div class="login-container">
        <form on:submit|preventDefault={handleSubmit}>
            <h2>Login</h2>
            <div class="form-group">
                <label for="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    on:change={handleChange}
                    bind:value={$form.username}
                />
                {#if $errors.username}
                    <span class="error">{$errors.username}</span>  
                {/if}            
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    on:change={handleChange}
                    bind:value={$form.password}
                />
                {#if $errors.password}
                    <span class="error">{$errors.password}</span>  
                {/if}    
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
{/if} -->
