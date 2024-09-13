<script>
    import { createForm } from "svelte-forms-lib";
    import { signUp, confirmSignUp, signIn, getCurrentUser } from 'aws-amplify/auth';
    import { userStore } from '$lib/auth/userStore';
    import { theme } from "./stores";
   
    let needsConfirm = false;
   
    const { form, errors, handleChange, handleSubmit } = createForm({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confCode: ''
        },
        validate: (values) => {
            let errors = {};
            if (!values.username) errors.username = 'Username is required';
            if (!values.password) errors.password = 'Password is required';
            if (values.password.length < 8) errors.password = 'Password must be 8 characters or more'
            if (!values.email) errors.email = 'Email is required';
            if (needsConfirm && !values.confCode) errors.confCode = 'Confirmation code is required';
            return errors;
        },
        onSubmit: async (values) => {
            try {
                if (needsConfirm) {
                    await handleConfirm(values);
                } else {
                    await handleRegister(values);
                }
            } catch (err) {
                console.error('Error', err);
            }
        }
    });
   
    async function handleRegister(values) {
        const { isSignUpComplete, userId, nextStep } = await signUp({
            username: values.username,
            password: values.password,
            options: {
                userAttributes: {
                    email: values.email,
                    'custom:theme':$theme
                }
            }    
        });
        if (!isSignUpComplete) {
            needsConfirm = true;
        } else {
            userStore.setRegStatus({
                completed: true,
                username: values.username
            });
        }
    }
   
    async function handleConfirm(values) {
        const { isSignUpComplete, nextStep } = await confirmSignUp({
            username: values.username,
            confirmationCode: values.confCode
        });
        if (isSignUpComplete) {
            needsConfirm = false;
            userStore.setRegStatus({
                completed: true,
                username: values.username
            });
            await regLogin(values)
        }
    }

    async function regLogin(values) {
        try {
            const { isSignedIn, nextStep } = await signIn({
                username: values.username,
                password: values.password,
            });
            if (isSignedIn) {
                const currentUser = await getCurrentUser();
                userStore.setUser(currentUser);
            } else {
                console.log('Failed to Login after registration');
            }
        } catch(err) {
            console.error('Login error after registration', err);
        }
}
</script>

<style>
    .reg-cont {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        background-color: var(--primary-color);
        border-bottom-right-radius: 0.2rem;
        padding: 2rem 2rem 3rem 1rem;
    }
    .form-group {
        flex: 1;
        margin-bottom: 0.7rem;
    }
    input {
        width: 100%;
        padding: 5px;
        border: 1px solid var(--lighter-color);
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

<div class="reg-cont">
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
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                bind:value={$form.email}
                on:change={handleChange}
            />
            {#if $errors.email}
                <span class="error">{$errors.email}</span>
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

        {#if needsConfirm}
            <div class="form-group">
                <input
                    type="text"
                    id="confirmationCode"
                    name="confirmationCode"
                    placeholder="Confirmation Code"
                    bind:value={$form.confCode}
                    on:change={handleChange}
                />
                {#if $errors.confCode}
                    <span class="error">{$errors.confCode}</span>
                {/if}
            </div>
        {/if}

        <button type="submit">
            {needsConfirm ? 'Confirm': 'Register'}
        </button>
    </form>
</div>