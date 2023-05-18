'use client'

import Provider from '../provider'
import styles from './Spage.module.css'

const SignInPage = () => {

  return (
    <Provider>
      <div className={styles.zed}>
        This Page can't connect because you are not admin, Pls login with account admin to use it 
      </div>
    </Provider>
  )
}


export default SignInPage