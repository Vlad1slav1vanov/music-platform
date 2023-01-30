import TrackItem from 'entities/track-item'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { type ITrack } from 'shared/models/track'

interface TrackListProps {
  tracks: ITrack[]
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  return (
    <div className="tracks" >
      <ul className="tracks__list" >
        {tracks.map((track) =>
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
