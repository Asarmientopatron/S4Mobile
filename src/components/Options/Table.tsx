import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Cell } from '../../interfaces/CellInterface';
import { Cell as MyCell } from './Cell';
import { ApproveQuoteModal } from '../ApproveQuote/ApproveQuoteModal';
import Icon from 'react-native-vector-icons/Ionicons';
import { CotizacionContext } from '../../contexts/cotizacionContext/CotizacionContext';

const actions = {
  aprobar: 'checkmark-circle',
  listar: 'eye'
}

interface Props {
  cells: Cell[],
  rows: any,
  permisos: string[]
}

export const Table = ({cells, rows, permisos}: Props) => {
  const {selectedRow, onShow} = useContext(CotizacionContext);
  const {width} = useWindowDimensions();
  const [showModal, setShowModal] = useState(false);
  const [rowSelected, setRowSelected] = useState({id: 0, tipo: ''});

  const onViewCotizacion = (id: number, tipo: string) => {
    onShow(id, tipo);
    setRowSelected({id, tipo});
  }

  useEffect(() => {
    if(rowSelected.id!==0){
      setShowModal(true)
    }
  }, [rowSelected.id])

  const handleOnClose = () => {
    setShowModal(false);
    setRowSelected({id: 0, tipo: ''})
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
              columns={cells.length+1}
              numberOfLines={cell.numberOfLines}
              adjustFont={cell.adjustFont}
              title
            />
          );
        })}
      </View>
      <View style={styles.rowsContainer}>
        {rows.map((row: any) => {
          return (<View key={row.id+row.tipo_cotizacion} style={styles.row}>
            { permisos.length > 0 &&
              <TouchableOpacity 
                style={{
                  ...styles.textContainer, 
                  width: (width*0.9-10)/(cells.length+3)
                }}
              >
                {permisos.includes('Aprobar')&& (
                  <Icon
                    onPress={() => onViewCotizacion(row.id, row.tipo_cotizacion)}
                    name={actions.aprobar}
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
                  value={cell.value(row[cell.id])}
                  columns={cells.length+1}
                />
              );
            })}
          </View>)
        })}
      </View>
      {showModal && <ApproveQuoteModal handleOnClose={handleOnClose} selectedRow={selectedRow!} tipo={rowSelected.tipo}/> }
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
