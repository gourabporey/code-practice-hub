package io.github.gourabporey.nesting;

import java.util.*;

public class ApnaMap<K, V> {
  private final Collection<Entry<K, V>> entries;
  private Integer modCount;
  private Values values;

  public ApnaMap() {
    this.entries = new ArrayList<>();
    this.modCount = 0;
  }

  public void put(K key, V val) {
    this.entries.add(new Entry<>(key, val));
    this.modCount++;
  }

  public V get(K key) {
    for(Entry<K, V> entry: entries) {
      if(entry.getKey().equals(key)) {
        return entry.getValue();
      };
    }

    return null;
  }

  public Collection<Entry<K,V>> entrySet() {
    return this.entries;
  }

  public Collection<V> values() {
    Collection<V> vs = values;

    if(vs == null) {
      values = new Values();
      vs = values;
    }

    return vs;
  }

  public static class Entry<K, V> {
    private final K key;
    private final V val;

    public Entry(K key, V val) {
      this.key = key;
      this.val = val;
    }

    public V getValue() {
      return val;
    }

    public K getKey() {
      return key;
    }

    @Override
    public String toString() {
      return "Entry{" +
          "key=" + key +
          ", val=" + val +
          '}';
    }
  }

  public class ValueIterator implements Iterator<V> {
    private final ArrayList<Entry<K, V>> ent;
    private Integer currentIndex = -1;
    private final Integer mc;

    public ValueIterator() {
      mc = modCount;
      ent = (ArrayList<Entry<K,V>>) entries;
    }

    @Override
    public boolean hasNext() {
      return currentIndex <= entries.size() - 2;
    }

    @Override
    public V next() {
      if(mc != modCount) throw new ConcurrentModificationException();
      return ent.get(++currentIndex).getValue();
    }
  }

  public class Values extends AbstractCollection<V> {
    @Override
    public Iterator<V> iterator() {
      return new ValueIterator();
    }

    @Override
    public int size() {
      return entries.size();
    }
  }
}
