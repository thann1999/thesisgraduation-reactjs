import { Grid } from '@material-ui/core'
import Loading from 'dataworld/blocks/loading/loading-page.component'
import React from 'react'
import ProfileActivity from '../components/profile-activity/profile-activity.component'
import ProfileInfo from '../components/profile-info/profile-info.component'
import Profile from './profile.component'

export interface ProfileProps {
  self: Profile
}

export default function ProfileTemplate({ self }: ProfileProps) {
  const { state } = self
  
  return (
    <>
      {state.isLoading ?
        <Loading />
        :
        <div className='root'>
          <Grid container>
            <Grid item xs={3}>
              <ProfileInfo self={self} />
            </Grid>

            <Grid item xs={9}>
              <ProfileActivity self={self} />
            </Grid>
          </Grid>
        </div>}

    </>

  )
}