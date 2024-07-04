<script>
    import { createForm } from "svelte-forms-lib";
    import { signUp, confirmSignUp, signIn, getCurrentUser } from 'aws-amplify/auth';
    import { user } from '$lib/userStore';

    let signingUp = false;
    let needsConfirm = false;

    const { form, errors, handleChange, handleSubmit } = createForm({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmationCode: ''
        },
        validate: values => {
            let errors = {};
            if (!values.username) errors.username = 'Username is required';
            if (!values.password) errors.password = 'Password is required';
            if (signingUp && !values.email) errors.email = 'Email is required';
            if (needsConfirm && !values.confirmationCode) errors.confirmationCode = 'Confirmation code is required';
            return errors;
        },
        onSubmit: async values => {
            try {
                if (needsConfirm) {
                    await handleConfirm(values);
                } else if (signingUp == false) {
                    await handleRegister(values);
                } else {
                    await handleLogin(values);
                }
            } catch (err) {
                console.error('Error', err);
            }
        }
    });

    async function handleLogin(values) {
        const { isSignedIn, nextStep } = await signIn({ 
            username: values.username,
            password: values.password,
            options: {
                userAttributes: {
                    email: values.email,
                }
            } 
        });
        if (isSignedIn) {
            signingUp = false
            const currentUser = await getCurrentUser();
            user.set(currentUser);
        } else {
            console.log('Failed to Login');
        }
    }

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
            signingUp = true
            needsConfirm = true;
        } else {
            await handleLogin(values);
        }
    }

    async function handleConfirm(values) {
        const { isSignUpComplete, nextStep } = await confirmSignUp({
            username: values.username,
            confirmationCode: values.confirmationCode
        });
        if (isSignUpComplete) {
            needsConfirm = false;
            await handleLogin(values);
        }
    }

    // function toggleSignUp() {
    //     signingUp = !signingUp;
    //     needsConfirm = false;
    // }
</script>


{#if $user !== null}
    <h1>Logged in as {$user.username}</h1>
    
{:else}
<form on:submit={handleSubmit}>
    <div>
        <label for="username">Username</label>
        <input
            id="username"
            name="username"
            type="username"
            on:change={handleChange}
            bind:value={$form.username}
        />
        {#if $errors.username}
            <span class="error">{$errors.username}</span>  
        {/if}            
    </div>
    <div>
        <label for="email">Email Address</label>
        <input
            id="email"
            name="email"
            type="email"
            on:change={handleChange}
            bind:value={$form.email}
        />
        {#if $errors.email}
            <span class="error">{$errors.email}</span>  
        {/if}            
    </div>
    <div>
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
   
    {#if needsConfirm}
        <div>
            <label for="confirmationCode">Confirmation Code</label>
            <input
                id="confirmationCode"
                name="confirmationCode"
                type="text"
                on:change={handleChange}
                bind:value={$form.confirmationCode}
            />
            {#if $errors.confirmationCode}
                <span class="error">{$errors.confirmationCode}</span>
            {/if}    
        </div>
    {/if}
   
    <button type="submit">
        {#if needsConfirm}
            Confirm
        {:else if signingUp == false}
            Sign Up
        {:else}
            Login
        {/if}
    </button>
     
 
</form>
{/if}