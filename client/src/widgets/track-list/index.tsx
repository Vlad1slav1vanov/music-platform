import TrackItem from 'entities/track-item'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import trackListStore from './model'
import './styles/index.scss'

const TrackList: React.FC = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    trackListStore.fetchTrackList()
  }, [])

  return (
    <div className="tracks">
      <ul className="tracks__list" >
        {trackListStore.trackList.map((track) =>
          <div
          className='track-wrapper'
          key={track._id}
          >
            <TrackItem track={track} />
          </div>
        )}
      </ul>
    </div>
  )
}

export default observer(TrackList)
