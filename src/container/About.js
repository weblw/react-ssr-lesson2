import React from 'react'
import styles from './About.css'
import withStyles from '../withStyles'

function About() {
  return (
    <div>
      <h1 className={styles.title}>登录页面</h1>
    </div>
  )
}

export default withStyles(About, styles)
