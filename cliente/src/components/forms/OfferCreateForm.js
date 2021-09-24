const OfferCreateForm = ({ values, handleChange, handleSubmit }) => {
  const { newOffer } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="number"
          name="newOffer"
          onChange={handleChange}
          placeholder="New Offer"
          className="form-control m-2"
          value={newOffer}
        />
      </div>

      <button disabled={!newOffer} className="btn btn-outline-primary m-2">
        Save
      </button>
    </form>
  );
};

export default OfferCreateForm;
