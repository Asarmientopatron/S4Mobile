import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Cell } from '../../interfaces/CellInterface';
import { Cell as MyCell } from './Cell';
import { AcceptServiceModal } from './AcceptServiceModal';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dato } from '../../interfaces/AcceptServiceInterface';
import { AcceptServiceContext } from '../../contexts/acceptServiceContext/AcceptServiceContext';

const actions = {
  aceptar: 'checkmark-circle',
  listar: 'eye'
}

interface Props {
  cells: Cell[],
  rows: Dato[],
  permisos: string[]
}

export const Table = ({cells, rows, permisos}: Props) => {
  const {selectedRow, onShow} = useContext(AcceptServiceContext);
  const {width} = useWindowDimensions();
  const [showModal, setShowModal] = useState(false);

  const onViewService = (selectedRow: Dato) => {
    onShow(selectedRow);
  }

  useEffect(() => {
    if(selectedRow?.id){
      setShowModal(true)
    }
  }, [selectedRow?.id])

  const handleOnClose = () => {
    setShowModal(false);
  }

  return (
    <View style={styles.width}>
      <View style={styles.headersContainer}>
        <MyCell 
          align={'center'} 
          value={'Accion'} 
          columns={cells.length+3}
          title
        />
        {cells.map((cell) => {
          return (
            <MyCell 
              key={cell.id} 
              align={cell.align} 
              value={cell.label} 
              columns={cells.length+(cell.width??1)}
              numberOfLines={cell.numberOfLines}
              adjustFont={cell.adjustFont}
              title
            />
          );
        })}
      </View>
      <View style={styles.rowsContainer}>
        {rows.map((row: any) => {
          return (<View key={row.id+row.tipo_servicio} style={styles.row}>
            { permisos.length > 0 &&
              <TouchableOpacity 
                style={{
                  ...styles.textContainer, 
                  width: (width*0.9-10)/(cells.length+3)
                }}
              >
                {permisos.includes('Aceptar')&& (
                  <Icon
                    onPress={() => onViewService(row)}
                    name={actions.aceptar}
                    size={30}
                    color='green'
                  />
                )}
              </TouchableOpacity>
            }
            {cells.map((cell) => {
              return (
                <MyCell 
                  key={cell.id+cell.value} 
                  align={cell.align}
                  numberOfLinesChild={cell.numberOfLinesChild} 
                  value={cell.value(row[cell.id])}
                  columns={cells.length+(cell.width??1)}
                />
              );
            })}
          </View>)
        })}
      </View>
      {showModal && <AcceptServiceModal handleOnClose={handleOnClose} selectedRow={selectedRow!}/> }
    </View>
  )
}

const styles = StyleSheet.create({
    width: {
      width: '95%',
      justifyContent: 'center'
    },
    headersContainer: {
      flexDirection: 'row',
      marginBottom: 10,
      alignItems: 'center'
    },
    rowsContainer: {
      borderBottomWidth: 1,
      borderTopWidth: 1
    },
    row : {
      flexDirection: 'row',
      borderBottomWidth: 0.4,
      borderTopWidth: 0.4,
      paddingVertical: 10,
      alignItems: 'center'
    },
    textContainer: {
      paddingHorizontal: 2,
      flexDirection: 'row',
      justifyContent: 'space-around'
    }
});
