<script>
    import { createForm } from "svelte-forms-lib"
    // @ts-ignore
    // @ts-ignore
    import {signUp, confirmSignUp, signIn } from 'aws-amplify/auth'
    
    export let loginSuccess;

    

    let signingUp = false;
    // @ts-ignore
    let needsConfirm = false;

    // @ts-ignore
    // @ts-ignore
    const { form, errors, handleChange, handleSubmit } = createForm({
        initialValues: {
            email: '',
            password: '',
            confirmationCode: ''
        },
        validate: values => {
            let errors = {};
            if (!values.password) errors.password = 'Password is required';
            if (signingUp && !values.email) errors.email = 'Email is required';
            if (needsConfirm && !values.confirmationCode) errors.confirmationCode = 'Confirmation code is required';
            return errors;
        },
        onSubmit: async values => {
            try {
                if (needsConfirm) {
                    
                    await handleConfirm(values);
                } else if (signingUp) {
                    
                    await handleRegister(values);
                } else {
            
                    await handleLogin(values)
                }
            } catch (err) {
                console.error('Error', err)
            }
        }
        
    }
)

async function handleLogin(values){
    const { isSignedIn, nextStep } = await signIn({ username: values.email, password: values.password
     }) 
     if (isSignedIn) {
        loginSuccess()
     } else {
        console.log('Failed to Login')
     }
}

async function handleRegister(values) {
    const { isSignUpComplete, userId, nextStep } = await signUp({
        username: values.email,
        password: values.password,
        }
    )
    if (!isSignUpComplete) {
        needsConfirm = true;
    } else {
        loginSuccess();
    }
}



async function handleConfirm(values){
    const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: values.email,
        confirmationCode: values.confirmationCode
    });
    if(isSignUpComplete) {
        needsConfirm = false;
        await handleLogin(values)
    }
}
</script>

<form on:submit={handleSubmit}>
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
            {:else}
                Login
            {/if}
            </button>

         
    </div>
</form>