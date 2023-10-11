package io.github.gourabporey.nesting;

import java.util.*;

public class ApnaMap<K, V> {
  private final int size;
  private final LinkedList<Node<K, V>>[] entries;

  public ApnaMap() {
    this.size = 16;
    this.entries = new LinkedList[this.size];
  }

  public void put(K key, V val) {
    int hashCode = key.hashCode();
    int indexToPut = getIndexToFind(hashCode);
    LinkedList<Node<K, V>> list = entries[indexToPut];

    if (list == null) {
      list = new LinkedList<>();
    }

    list.add(new Node<>(key, val, hashCode));
    entries[indexToPut] = list;
  }

  public V get(K key) {
    int hashCode = key.hashCode();
    int indexToFind = getIndexToFind(hashCode);

    LinkedList<Node<K, V>> list = entries[indexToFind];

    if (list == null) return null;
    for (Node<K, V> node : list) {
      if (node.getHashCode() == hashCode) return node.getVal();
    }

    return null;
  }

  private int getIndexToFind(int hashCode) {
    return Math.abs(hashCode % this.size);
  }

  public Collection<V> values() {
    return new Values();
  }

  private static class Node<K, V> {
    private final K key;
    private final V val;
    private final int hashCode;

    public Node(K key, V val, int hashCode) {
      this.key = key;
      this.val = val;
      this.hashCode = hashCode;
    }

    public K getKey() {
      return key;
    }

    public V getVal() {
      return val;
    }

    public int getHashCode() {
      return hashCode;
    }
  }

  private class Values extends AbstractCollection<V> {
    @Override
    public Iterator<V> iterator() {
      return new ValueIterator();
    }

    @Override
    public int size() {
      return size;
    }
  }

  private class ValueIterator implements Iterator<V> {
    private Iterator<Node<K, V>> listIterator;
    private final Iterator<LinkedList<Node<K, V>>> iterator;

    private ValueIterator() {
      this.iterator = Arrays.stream(entries).iterator();
    }

    @Override
    public boolean hasNext() {
      if (!iterator.hasNext()) return false;

      if (isNull(listIterator) || isLastNode()) {
        LinkedList<Node<K, V>> nextNodeList;

        do {
          nextNodeList = iterator.next();
        } while (isNull(nextNodeList) && iterator.hasNext());

        if (isNull(nextNodeList)) return false;

        listIterator = nextNodeList.iterator();
      }

      return listIterator.hasNext();
    }

    @Override
    public V next() {
      return listIterator.next().getVal();
    }

    private boolean isNull(Object o) {
      return o == null;
    }

    private boolean isLastNode() {
      return !this.listIterator.hasNext();
    }
  }
}
