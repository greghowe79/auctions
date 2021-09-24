const AuctionEditForm = ({
  values,
  handleChange,
  handleImageChange,
  handleSubmit,
}) => {
  const { title, description, image, startingOffer, endTime } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label>

        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />

        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Description"
          className="form-control m-2"
          value={description}
        />

        <input
          type="number"
          name="startingOffer"
          onChange={handleChange}
          placeholder="Starting Offer"
          className="form-control m-2"
          value={startingOffer}
        />

        <input
          type="datetime-local"
          name="endTime"
          onChange={handleChange}
          placeholder="End Time"
          className="form-control m-2"
          value={endTime}
        />
      </div>

      <button
        disabled={
          !title || !description || !startingOffer || !endTime || !image
        }
        className="btn btn-outline-primary m-2"
      >
        Save
      </button>
    </form>
  );
};

export default AuctionEditForm;
