import React, { useEffect, useState } from 'react'
import { groupWith } from 'ramda'
import { useParams } from 'react-router-dom'
import { IDog } from '../../core/apiTypes/apiType'
import { useStore } from '../../core/store/store'

export const Dog: React.FC = () => {
  const { pkr } = useParams<{ pkr: string }>()

  const dog = useStore(state => state.dogs.find(dog => dog.pkr === pkr))
  const dogs = useStore(state => state.dogs)

  const [children, setChildren] = useState<IDog[][] | null>(null)

  const groupLittersByMom = groupWith(
    (x: IDog, y: IDog) => x.mom?.name === y.mom?.name
  )

  const groupLittersByDad = groupWith(
    (x: IDog, y: IDog) => x.dad?.name === y.dad?.name
  )

  useEffect(() => {
    if (dog) {
      if (dog.sex) {
        const children = dogs.filter(d =>
          dog.sex ? d.dad?.name === dog.name : d.mom?.name === dog.name
        )
        const groupedChildren = dog.sex
          ? groupLittersByMom(children)
          : groupLittersByDad(children)
        setChildren(groupedChildren)
      }
    }
  }, [dog])

  return (
    <div>
      {children?.map((group, i) => {
        return (
          <div key={i}>
            {dog?.sex ? group[0].mom?.name : group[0].dad?.name}:
            {group.map(child => {
              return <p>{child.name}</p>
            })}
            <br />
          </div>
        )
      })}
    </div>
  )
}
