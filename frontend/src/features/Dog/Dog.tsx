import { format, parseISO } from 'date-fns';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { IDog } from '../../core/apiTypes/apiType';

export const Dog: React.FC = () => {
  const { pkr } = useParams<{ pkr: string }>();

  const [dogData, setDogData] = useState<{
    dog: IDog;
    litters: {
      parent: string;
      children: IDog[];
    }[];
  }>();

  const getDogWithChildren = useCallback(async (pkr: string) => {
    const response = await fetch(`http://localhost:4200/dog/${pkr}`);
    const data: {
      dog: IDog;
      litters: {
        parent: string;
        children: IDog[];
      }[];
    } = await response.json();
    setDogData(data);
  }, []);

  useEffect(() => {
    if (pkr) {
      getDogWithChildren(pkr);
    }
  }, [pkr, getDogWithChildren]);

  const { dog, litters } = dogData ?? {};

  return (
    <div>
      <div>
        <p>{dog?.name}</p>
        <p>{dog?.breeding.name}</p>
      </div>
      <br />
      {litters?.map((group, i) => {
        return (
          <div key={i}>
            <p>{group.parent}</p>
            {group.children.map((child, i, arr) => {
              return (
                <div key={child.pkr}>
                  {(i === 0 || (i > 0 && child.birth !== arr[i - 1].birth)) && (
                    <p>{format(parseISO(child.birth), 'dd.MM.yyyy')}</p>
                  )}
                  <span>{child.name}</span>
                </div>
              );
            })}
            <br />
          </div>
        );
      })}
    </div>
  );
};
