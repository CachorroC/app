'use client';
import { useDatabaseModelsContext } from '../Context/database-models-context';
import styles from './studio-clone.module.css';

export default function Page () {
  const {
    models, activeModel, tableData, setActiveModel
  } = useDatabaseModelsContext();

  return (

    <div className={styles.container}>
      {/* Sidebar Navigation */}
      <div className={styles.sidebar}>
        <h1 className={styles.sidebarTitle}>My Studio</h1>
        <ul className={styles.modelList}>
          {models.map( ( model ) => {
            const itemClass = [
              styles.modelItem,
              activeModel?.name === model.name
                ? styles.active
                : ''
            ]
              .filter( Boolean )
              .join( ' ' );

            return (
              <li
                key={model.name}
                className={itemClass}
                onClick={() => {
                  return setActiveModel( model );
                }}
              >
                {model.name}
              </li>
            );
          } )}
        </ul>
      </div>

      {/* Main Data Table Area */}
      <div className={styles.mainContent}>
        <h2 className={styles.mainTitle}>{activeModel?.name} Data</h2>

        {tableData.length === 0
          ? (
              <p className={styles.emptyMessage}>No records found. (Add POST logic to create some!)</p>
            )
          : (
              <table className={styles.table}>
                <thead className={styles.tableHead}>
                  <tr>
                    {/* Dynamically generate column headers based on DMMF fields */}
                    {activeModel?.fields.map( ( field ) => {
                      return (
                        <th key={field.name} className={styles.tableHeader}>
                          {field.name} <span className={styles.fieldType}>({field.type})</span>
                        </th>
                      );
                    } )}
                  </tr>
                </thead>
                <tbody>
                  {/* Dynamically render rows and cells */}
                  {tableData.map( (
                    row, index
                  ) => {
                    return (
                      <tr key={index} className={styles.tableRow}>
                        {activeModel?.fields.map( ( field ) => {
                          return (
                            <td key={field.name} className={styles.tableCell}>
                              {String( row[ field.name ] )}
                            </td>
                          );
                        } )}
                      </tr>
                    );
                  } )}
                </tbody>
              </table>
            )}
      </div>
    </div>
  );
}