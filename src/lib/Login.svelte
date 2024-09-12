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
            if (values.password.length < 8) errors.password = 'Password must be 8 characters or more'
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
        background-color: var(--primary-color);
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
        background-color: var(--secondary-color);
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
