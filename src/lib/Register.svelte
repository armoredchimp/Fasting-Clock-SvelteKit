<script>
    import { createForm } from "svelte-forms-lib";
    import { signUp, confirmSignUp } from 'aws-amplify/auth';
    import { userStore } from '$lib/auth/userStore';
   
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
        }
    }
</script>

<style>
    .reg-cont {
        background-color: #e8f5e9;
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
        color: #2e7d32;
        text-align: center;
        margin-bottom: 20px;
    }

    .form-group {
        margin-bottom: 15px;
    }

    label {
        display: block;
        margin-bottom: 5px;
        color: #1b5e20;
    }

    input {
        width: 100%;
        padding: 8px;
        border: 1px solid #a5d6a7;
        border-radius: 4px;
    }

    .error {
        color: #c62828;
        font-size: 0.8em;
        margin-top: 5px;
    }

    button {
        background-color: #4caf50;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #45a049;
    }
</style>

<div class="reg-cont">
    <form on:submit|preventDefault={handleSubmit}>
        <h2>Register</h2>

        <div class="form-group">
            <label for="username">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                bind:value={$form.username}
                on:change={handleChange}
            />
            {#if $errors.username}
                <span class="error">{$errors.username}</span>
            {/if}
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                bind:value={$form.email}
                on:change={handleChange}
            />
            {#if $errors.email}
                <span class="error">{$errors.email}</span>
            {/if}
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                bind:value={$form.password}
                on:change={handleChange}
            />
            {#if $errors.password}
                <span class="error">{$errors.password}</span>
            {/if}
        </div>

        {#if needsConfirm}
            <div class="form-group">
                <label for="confirmationCode">Confirmation Code</label>
                <input
                    type="text"
                    id="confirmationCode"
                    name="confirmationCode"
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