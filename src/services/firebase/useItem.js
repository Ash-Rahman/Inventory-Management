function useItem(fStore) {
  const ref = fStore().collection('items');
  const createCheckin  = checkin => ref.add(checkin);
  const readCheckins = () => ref.get();

  //const updateCheckin = (checkinID, data) => ref.doc(checkinID).add(data);
  const getCheckinById = checkinID => ref.doc(checkinID).get();
  const updateCurrentItem = (checkinID, item) => ref.doc(checkinID).update(item);

  // below we add the methods to create a sub collection to hold checkin comments
  const createItemHistory = (checkinID, comment) => ref.doc(checkinID).collection('history').add(comment);

  const readItemHistory = (checkinID) => ref.doc(checkinID).collection('history').get();

  return {createCheckin, readCheckins, createItemHistory, readItemHistory, getCheckinById, updateCurrentItem}
}
export default useItem;
