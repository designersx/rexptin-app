import React, { useState } from 'react'
import styles from './SideFilter.module.css'
function SideFilter({ filters, onFilterChange, isLeadTypeSummary }) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [searchText, setSearchText] = useState('');
  const channelOptions = [
    { label: 'Web widget', value: 'web_call' },
    { label: 'Phone number', value: 'phone_call' },
    { label: 'All', value: '' }
  ];
  const leadOptions = [
    { label: 'Web widget', value: 'negative' },
    { label: 'Phone number', value: 'neutral' },
    { label: 'Phone number', value: 'postive' },
    { label: 'All', value: '' }
  ];
  const handleLeadTypeChange = (type) => {
    const updatedTypes = localFilters.leadType.includes(type)
      ? localFilters.leadType.filter(t => t !== type)
      : [...localFilters.leadType, type];

    setLocalFilters(prev => ({ ...prev, leadType: updatedTypes }));
    // DON'T call onFilterChange here
  };

  const handleChannelChange = (channel) => {
    setLocalFilters(prev => ({ ...prev, channel }));
    // DON'T call onFilterChange here
  };

  const handleApply = () => {
    onFilterChange(localFilters); 
  };

  const handleClear = () => {
    const clearedFilters = { leadType: [], channel: '' };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters); 
  };
  return (
    <div>
      <div className={styles.OffcanvasMain} style={{ padding: '20px' }}>
        <h3>Filter by</h3>
        <hr></hr>

        <input
          type="search"
          placeholder="Search Lead Type or Channel..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '20px' }} />


        <div className={styles.section}>
          <div className={styles.label}>Lead Type</div>
          {[...new Set(
            isLeadTypeSummary
              .map(item => item.custom_analysis_data?.lead_type)
              .filter(Boolean)
          )].filter(type => type.toLowerCase().includes(searchText.toLowerCase()))
            .map(type => (
              <label className={styles.checkbox} key={type}>
                {type}
                <input
                  type="checkbox"
                  checked={localFilters.leadType.includes(type)}
                  onChange={() => handleLeadTypeChange(type)}
                />
              </label>
            ))}
        </div>


        <div className={styles.section}>
          <div className={styles.label}>Channel</div>
          {channelOptions
            .filter(({ label }) => label.toLowerCase().includes(searchText.toLowerCase()))
            .map(({ label, value }) => (
              <label className={styles.radio} key={value || 'all'}>
                {label}
                <input
                  type="radio"
                  name="channel"
                  checked={localFilters.channel === value}
                  onChange={() => handleChannelChange(value)}
                />
              </label>
            ))}
        </div>

        <hr></hr>

        <div className={styles.actions}>
          <button className={styles.clear} onClick={handleClear}>Clear All</button>
          <button className={styles.apply} onClick={handleApply}>Apply</button>
        </div>



      </div>


    </div>
  )
}

export default SideFilter